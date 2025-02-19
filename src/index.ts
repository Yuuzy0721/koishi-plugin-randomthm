import { Context, Schema, h } from 'koishi'
import { id } from './id'


export const name = 'randomthm'

export interface Config {
  SendID: boolean
  LogOn: boolean
}

export const Config: Schema<Config> = Schema.object({
  SendID: Schema.boolean().description('是否发送音乐id').default(true),
  LogOn: Schema.boolean().description('是否开启日志').default(false)
})

export async function apply(ctx: Context, cfg: Config) {
  // api https://ncm.nekogan.com/song/url/v1?id=歌曲id&level=higher
  const logger = ctx.logger("randomthm")
  ctx.command('rtm').alias('随机东方曲').action(async ({ session }) => {
    if (!session) return
    var randomIndex = Math.floor(Math.random() * id.length)
    var randomid = id[randomIndex]
    var url = `https://ncm.nekogan.com/song/url/v1?id=${randomid}&level=higher`
    //logger.info(url)
    try{
      var response = await ctx.http(`https://ncm.nekogan.com/song/url/v1?id=${randomid}&level=higher`)
      var code = response.data.code
      var music = response.data.data[0].url
      if(cfg.SendID === true){
        await session.send(`音乐id:${randomid}`)
      }
      await session.send(h.audio(music))
    }catch (error){
      //处理请求错误
      if(cfg.LogOn === true){
        logger.error(`请求错误`)
        logger.info(`歌曲id:${randomid},api地址:${url},状态码:${code},音乐url:${music}`)
        await session.send('发生错误，请查看日志。')
      }else{
        await session.send('发生错误。')
      }
    }
  })
}
