import {select,isCancel} from "@clack/prompts";
import chalk from "chalk"
import figlet from "figlet";

const BANNER_FONT = 'ANSI Shadow';
const SHADOW = chalk.hex('#5b4d9e');
const FACE = chalk.hex('#4b859a').bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, '').split('\n');
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);//breaking the space inbetween
  const rowWidth = maxLen + 2;
  for (const line of bannerLines) {//making the words
    console.log(SHADOW(('  ' + line).padEnd(rowWidth)));
  }
  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {//printing
    console.log(FACE(line.padEnd(rowWidth)));
  }
  console.log();//line break
}

export async function runWakeup(){
let ascii:string;
try{
    ascii=figlet.textSync("devagent",{font:BANNER_FONT});
}catch(error){
ascii=figlet.textSync("devagent",{font:"Standard"});
}
printBannerWithShadow(ascii);

const mode=await select({
    message:"which mode you want to proceed with?",
    options:[
        {value:"cli",label:"CLI"},
        {value:"telegram",label:"Telegram"},
    ],
});
if(isCancel(mode)){
  process.exit(0);
}
if(mode=="cli"){
  console.log(chalk.dim("starting cli mode"));
}else{
  console.log(chalk.dim("starting telegram mode"));
}
}