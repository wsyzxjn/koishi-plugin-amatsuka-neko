import { console } from "inspector";
import { Context, Schema } from "koishi";

export const name = "amatsuka-neko";

export interface Config {}

export const Config: Schema<Config> = Schema.object({});

export function apply(ctx: Context) {
  ctx.on("before-send", (session, options) => {
    const content = session.content;
    console.log(session.toJSON());
    if (content.split("\n").length === 1) {
      if (content.match(/^<.*>$/)) return false;
      const lastChar = content[content.length - 1];
      session.content =
        content +
        (lastChar.match(/[\u4e00-\u9fa5]/) && lastChar !== "喵" ? "喵" : " 喵");
    }
    return false;
  });
}
