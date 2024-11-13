const HOME = "home";

// You have to run this script once per target

let hacked = [];

/** @param {NS} ns */
export async function main(ns) {
	
	ns.tail();
	ns.moveTail(1650, 725);
	ns.resizeTail(250, 100);

	ns.disableLog("disableLog");
	ns.disableLog("clearLog");
	ns.disableLog("sleep");
	ns.disableLog("scan");
	ns.clearLog();
	
	const targets = [
		"CSEC",
		"avmnite-02h",
		"I.I.I.I",
		"run4theh111z"//,
		// "w0r1d_d43m0n"
	];

	while (!ns.fileExists("SQLInject.exe")) {
		await ns.sleep(12000);
	}
	for (let i = 0; i < targets.length; i++) {
		if (targets[i] == "w0rld_d43m0n") {
			while (!ns.singularity.getOwnedAugmentations().includes("The Red Pill")) {
				ns.clearLog();
				ns.print("Waiting for red pill");
				await ns.sleep(60000);
			}
		}
		await root(ns, targets[i]);
	}
}
function buildRoute(ns, parent, target, route, seen = []) {
    //first time we run we need to add the parent to the list of servers we've seen
    if (!seen.includes(parent)) {
        seen.push(parent);
	}
    //add to route
    route.push(parent);
    const children = ns.scan(parent);
    for (const child of children) {
        if (seen.includes(child)) {
            //already checked
            continue;
        }
        seen.push(child);
        if (child == target) {
            //found target, add it to the route and finish recursion
            route.push(child);
            return true;
        }
        if (buildRoute(ns, child, target, route, seen)) {
            //target found, finish recursion
            return true;
        }
        else {
            //target not found in this branch, remove from route
            route.pop();
        }
    }
    //didn't find target in this route, reset route
    route = [];
    return false;
}
async function printRoute(ns, route) {
    let result = [];
    for (const node of route) {
        result.push(node);
    }
    return result;
}
async function root(ns, target) {
	if (!ns.hasRootAccess(target)) {
		ns.brutessh(target);
		ns.ftpcrack(target);
		ns.relaysmtp(target);
		ns.httpworm(target);
		ns.sqlinject(target);
		ns.print("Gained root access to ", target);
		while (ns.getHackingLevel() < ns.getServerRequiredHackingLevel(target)) {
			await ns.sleep(6000);
		}
		ns.nuke(target);

		ns.singularity.connect(HOME);
		await ns.sleep(100);

		let result = [];
		let route = [];

		buildRoute(ns, HOME, target, route)
		result = await printRoute(ns, route);

		for (let n = 0; n < result.length; n++) {
			ns.singularity.connect(result[n]);
			await ns.sleep(100);
		}
		await ns.singularity.installBackdoor();
		ns.singularity.connect(HOME);
	} else if (!ns.getServer(target).backdoorInstalled) {
		ns.singularity.connect(HOME);
		await ns.sleep(100);

		let result = [];
		let route = [];
		
		buildRoute(ns, HOME, target, route)
		result = await printRoute(ns, route);
		
		for (let n = 0; n < result.length; n++) {
			ns.singularity.connect(result[n]);
			await ns.sleep(100);
		}
		await ns.singularity.installBackdoor();
		ns.singularity.connect(HOME);
	}
	hacked.push(target);
	ns.clearLog();
	ns.print("Hacked servers: ", )
	for (let j = 0; j < hacked.length; j++) {
		ns.print(hacked[j]);
	}
	return 0;
}