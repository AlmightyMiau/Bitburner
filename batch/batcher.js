// Make starting values so it won't break
const BUFFER = 150;
const THREADS = 100;
const HOME = 'home';

let setOfObjects = {};
// Object is now initialized
let object = {
	target: {},
	bufferTime: 100,

	weakenTime: {},
	weakenAmount: 0.05,

	growTime: {},
	growPercent: {},
	growSecurity: {},

	hackTime: {},
	maxMoney: {},
	hackSecurity: {},

	growThreads: THREADS,
	weakenThreadsGrow: THREADS,
	hackThreads: THREADS,
	weakenThreadsHack: THREADS,

	weakenBuffer: {},
	growBuffer: {},
	hackBuffer: {}
};
export { setOfObjects };

/** @param {NS} ns */
export async function main(ns) {
// RUNS BATCH.JS SCRIPTS FOR LEAST DOWNTIME
/********************************************************************
    * Takes as argument: server, ?("ram" || "memory")
	*
	* If ram or memory are the second args, just determines ram needed to use program
	* If not, runs the sequence hack, weaken, grow, weaken with a time of [BUFFER] between each step
	* This should (theoretically) earn the most money possible from a server
	*
	* Biggest downside of this program is that it needs many TB of ram (64+)
	*
	* run batch.js once every buffer time * 4
	* pass the object through as an object
	****************************************************************/
	// ns.disableLog("ALL");
	// ns.enableLog("sleep");
	ns.tail();
	ns.resizeTail(300, 130);
	ns.moveTail(1065, 550);
	
	// Get the target server from the arguments passed
	let target = ns.args[0];
	if (target === undefined) {
		ns.tprint("No target specified for batcher");
		ns.exit();
	}

	// Stand idle until we can actually hack the server
	if (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(target)) {
		while (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(target)) {
			await ns.sleep(6000);
		}
	}

	// Make sure the security is at a minimum
	while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
		ns.print("Weakening ", target);
		ns.exec("batch/weaken.js", "home", 
			Math.min(
				Math.ceil((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) * 20), 
				Math.floor((ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME)) / ns.getScriptRam("batch/weaken.js"))
			), 
			target);
		await ns.sleep(ns.getWeakenTime(target) + 500);
	}
	// Make sure the money is at a maximum
	while (ns.getServerMoneyAvailable(target) != ns.getServerMaxMoney(target)) {
		// Make sure the security is at a minimum
		while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
			ns.print("Weakening ", target);
			ns.exec("batch/weaken.js", "home", 
				Math.min(
					Math.ceil((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) * 20), 
					Math.floor((ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME)) / ns.getScriptRam("batch/weaken.js"))
				), 
				target);
			await ns.sleep(ns.getWeakenTime(target) + 500);
		}
		ns.print("Growing ", target);
		ns.exec("batch/grow.js", "home", 
			Math.min(
				Math.ceil(ns.growthAnalyze(target, ns.getServerMaxMoney(target) / (ns.getServer().moneyAvailable + 1))), 
				Math.floor((ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME)) / ns.getScriptRam("batch/grow.js"))
			), 
			target);
		await ns.sleep(ns.getGrowTime(target) + 500);
	}
	// Make sure the security is at a minimum
	while (ns.getServerSecurityLevel(target) > ns.getServerMinSecurityLevel(target)) {
		ns.print("Weakening ", target);
		ns.exec("batch/weaken.js", "home", 
			Math.min(
				Math.ceil((ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target)) * 20), 
				Math.floor((ns.getServerMaxRam(HOME) - ns.getServerUsedRam(HOME)) / ns.getScriptRam("batch/weaken.js"))
			), 
			target);
		await ns.sleep(ns.getWeakenTime(target) + 500);
	}

	setOfObjects[target] = object;

	setOfObjects[target].target = ns.args[0];
	setOfObjects[target].bufferTime = BUFFER;

	setOfObjects[target].weakenTime = ns.getWeakenTime(setOfObjects[target].target);
	setOfObjects[target].weakenAmount = 0.05;

	setOfObjects[target].growTime = ns.getGrowTime(setOfObjects[target].target);
	setOfObjects[target].growPercent = ns.getServerGrowth(setOfObjects[target].target);
	setOfObjects[target].growSecurity = ns.growthAnalyzeSecurity(1, setOfObjects[target].target, ns.getServer("home").cpuCores);

	setOfObjects[target].hackTime = ns.getHackTime(setOfObjects[target].target);
	setOfObjects[target].maxMoney = ns.getServerMaxMoney(setOfObjects[target].target);
	setOfObjects[target].hackSecurity = ns.hackAnalyzeSecurity(1, setOfObjects[target].target);

	setOfObjects[target].growThreads = 1 + ns.growthAnalyze(setOfObjects[target].target, setOfObjects[target].maxMoney / (ns.getServer().moneyAvailable + 1));
	setOfObjects[target].weakenThreadsGrow = 10 + ((ns.growthAnalyzeSecurity(setOfObjects[target].growThreads, target, ns.getServer("home").cpuCores)) / setOfObjects[target].weakenAmount);
	setOfObjects[target].hackThreads = 1 + ns.hackAnalyzeThreads(setOfObjects[target].target, setOfObjects[target].maxMoney);
	setOfObjects[target].weakenThreadsHack = 10 + (ns.hackAnalyzeSecurity(setOfObjects[target].hackThreads, setOfObjects[target].target)) / setOfObjects[target].weakenAmount;

	setOfObjects[target].weakenBuffer = (2 * setOfObjects[target].bufferTime);
	setOfObjects[target].growBuffer = (setOfObjects[target].weakenTime - setOfObjects[target].bufferTime - setOfObjects[target].growTime);
	setOfObjects[target].hackBuffer = (setOfObjects[target].growTime - (2 * setOfObjects[target].bufferTime) - setOfObjects[target].hackTime);

	// if ram or memory are the second args, determine ram need to use program
	// Ram per second { ram of each batch (batch, weaken * 2, grow, hack) divided by (BUFFER * 5 / 1000) }
	// max ram is rate * weaken time
	if (ns.args[1] == "ram" || ns.args[1] == "memory") {
		ns.tprint( // Max RAM from batching this server
			"RAM needed to batch ", target, " is ",
			( // RAM per second
				( // RAM per batch
					ns.getScriptRam("/batch/batch.js") + 
					(ns.getScriptRam("/batch/weaken.js") * setOfObjects[target].weakenThreadsGrow) + 
					(ns.getScriptRam("/batch/weaken.js") * setOfObjects[target].weakenThreadsHack) + 
					(ns.getScriptRam("/batch/grow.js") * setOfObjects[target].growThreads) + 
					(ns.getScriptRam("/batch/hack.js") * setOfObjects[target].hackThreads) 
				)
				/
				(
					BUFFER * 5 / 1000
				)
			)
			*
			( // Number of seconds
				ns.getWeakenTime(target) / 1000
			)
		);
		ns.tprint(
			"Values: ",
			"\nbatch ram: ", ns.getScriptRam("/batch/batch.js"),
			"\nweaken ram: ", 2 * ns.getScriptRam("/batch/weaken.js"),
			"\ngrow ram: ", ns.getScriptRam("/batch/grow.js"),
			"\nhack ram: ", ns.getScriptRam("/batch/hack.js"),
			"\nRAM per batch: ", ( ns.getScriptRam("/batch/batch.js") + ns.getScriptRam("/batch/weaken.js") + ns.getScriptRam("/batch/weaken.js") + ns.getScriptRam("/batch/grow.js") + ns.getScriptRam("/batch/hack.js") ),
			"\nPer time: ", BUFFER * 5 / 1000,
			"\nRAM per second: ", ( // RAM per batch
					ns.getScriptRam("/batch/batch.js") + 
					(ns.getScriptRam("/batch/weaken.js") * setOfObjects[target].weakenThreadsGrow) + 
					(ns.getScriptRam("/batch/weaken.js") * setOfObjects[target].weakenThreadsHack) + 
					(ns.getScriptRam("/batch/grow.js") * setOfObjects[target].growThreads) + 
					(ns.getScriptRam("/batch/hack.js") * setOfObjects[target].hackThreads) 
				)
				/
				(
					BUFFER * 5 / 1000
				),
			"\nFor ", ns.getWeakenTime(target) / 1000, " seconds"
		);
		ns.exit();
	}

	ns.disableLog("ALL");
	ns.clearLog();

	ns.print(target, ":");
	ns.print("Money: ", formatLargeNumber(setOfObjects[target].maxMoney));
	ns.print("per time: ", setOfObjects[target].bufferTime * 5);
	ns.print("Money per second: ", formatLargeNumber(setOfObjects[target].maxMoney / (BUFFER * 5 / 1000)));

	while (true) {
		ns.exec("/batch/batch.js", "home", 1, target);
		await ns.sleep(setOfObjects[target].bufferTime * 5);
	}

	// ns.tprint(setOfObjects[target].weakenThreadsHack);

}

// NOT MY CODE
// Used to format numbers for logging
function formatLargeNumber(number) {
    const suffixes = ['', ' thousand', ' million', ' billion', ' trillion', ' quadrillion', ' quintillion', ' sextillion', ' septillion', ' octillion', ' nonillion', ' decillion'];
    let suffixIndex = 0;

    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
        number /= 1000;
        suffixIndex++;
    }

    return number.toFixed(2).replace(/\.00$/, '') + suffixes[suffixIndex];
}