var money;

/** @param {NS} ns */
export async function main(ns) {
	getmoney(ns);

	ns.tail();
	ns.moveTail(1050, 525);
	ns.resizeTail(250, 100);

	let factions = ns.getPlayer().factions;
	ns.disableLog("disableLog");
	ns.disableLog("clearLog");
	ns.disableLog("sleep");
	ns.disableLog("singularity.getUpgradeHomeRamCost");
	ns.disableLog("singularity.getUpgradeHomeCoresCost");
	ns.disableLog("getServerMoneyAvailable");
	ns.clearLog();
	while (true) {
		getmoney(ns);
		if (money > ns.singularity.getUpgradeHomeRamCost()) {
			ns.singularity.upgradeHomeRam();
		} else if (money > ns.singularity.getUpgradeHomeCoresCost()) {
			ns.singularity.upgradeHomeCores();
		} else if (ns.singularity.checkFactionInvitations().length > 0) {
			ns.singularity.joinFaction(ns.singularity.checkFactionInvitations()[0]);
		} 
		await ns.sleep(1000);
	}
}


function getmoney(ns) {
	money = ns.getServerMoneyAvailable("home");
}