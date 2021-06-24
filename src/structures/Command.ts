import { Message } from "discord.js";
import { App } from "../app";

export interface CommandData {
  name: string
  desc?: string
  args?: Argument[]
}

export interface Argument {
  name: string
  required?: boolean
}

export type MiddlewareMethod = (app: App, msg: Message, args: string[], next: () => void) => void;
export type Executor = (app: App, msg: Message, args: string[]) => void;

const defaultExecutor: Executor = (app, msg, args) => { return msg.reply("This command has no executor"); }

export class Command {
  _middlewareMethods: MiddlewareMethod[] = []
  private _executor: Executor = defaultExecutor;
  
  private _name: string;
  private _desc: string;
  private _args: Argument[];
  
  constructor(vals?: CommandData) {
    vals = vals ?? { name: "" } 

    this._name = vals.name;
    this._desc = vals.desc ?? this._name;
    this._args = vals.args ?? []
  }

  get name(): string { return this._name; }
  get desciption(): string { return this._desc; }
  get args(): Argument[] { return this._args }

  public use(...mwm: MiddlewareMethod[]): Command {
    mwm.map(meth => this._middlewareMethods.push(meth));
    return this;
  }

  public setName(name: string): Command {
    this._name = name;
    return this;
  }

  public setDesc(desc: string): Command {
    this._desc = desc;
    return this;
  }

  public setExecutor(executor: Executor): Command {
    this._executor = executor;
    return this;
  }

  async execute(client: App, message: Message): Promise<Command> {
    const args = message.content.trim().split(/ +/g);
    args.shift();

    if (this.args.filter(arg => arg.required).length > args.length) {
      message.reply('Invalid request')
      return this
    }

    let proms: Promise<void>[] = []
    this._middlewareMethods.map(fn => proms.push(new Promise((res, rej) => fn(client, message, args, res))));

    if (proms.length > 0) await Promise.all(proms);

    this._executor(client, message, args);
    return this;
  }
}
