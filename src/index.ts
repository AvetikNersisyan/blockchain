import { log } from "console";
import { Block } from "./chain/block";

const block = new Block(Date.now(), 'ddata', 1);
block.mineBlock()

log(block, 'block')