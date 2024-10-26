import { setOfObjects } from '/batch/batcher.js';

/** @param {NS} ns */
export async function main(ns) {
	// SINGLE BATCH RUN BY BATCHER.JS
	// RUNS TWO WEAKENS, A GROW, AND A HACK
	// SEPERATED BY SOME TIME
	/*
	Initialize the object

	run weaken.js with [weaken-hack] threads
	wait some [weakenBuffer] time
	run weaken.js with [weakenThreadsGrow] threads
	wait some [grow buffer] time
	run grow.js with [grow] threads
	wait some [hack buffer] time
	run hack.js with [hack] threads
	*/

	// ns.disableLog("ALL");
	// ns.clearLog();
	// ns.tail();

	let object = setOfObjects[ns.args[0]];


	ns.exec("/batch/weaken.js", "home", Math.ceil(object.weakenThreadsHack), object.target);
	await ns.sleep(object.weakenBuffer);
	ns.exec("/batch/weaken.js", "home", Math.ceil(object.weakenThreadsGrow), object.target);
	await ns.sleep(object.growBuffer);
	ns.exec("/batch/grow.js", "home", Math.ceil(object.growThreads), object.target);
	await ns.sleep(object.hackBuffer);
	ns.exec("/batch/hack.js", "home", Math.ceil(object.hackThreads), object.target);
	// ns.tprint(object.weakenThreadsHack)

}