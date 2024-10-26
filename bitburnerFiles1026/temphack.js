/** @param {NS} ns */
export async function main(ns) {
	// What server will be targeted?
	let target = ns.args[0];
	if (target === undefined) {
		ns.exit();
	}
	
	ns.print("At min security: ", ns.getServerMinSecurityLevel(target) == ns.getServerSecurityLevel(target));
	ns.print("At max money: ", ns.getServerMaxMoney(target) == ns.getServerMoneyAvailable(target));
	
	// while (ns.getServerSecurityLevel(target) > (securityThresh)) {
	// 	// If the server's security level is above our threshold, weaken it
	// 	await ns.weaken(target);
	// }
	await ns.hack(target);
	// await ns.weaken(target);
	// await ns.sleep(1000);
	
	ns.getServerMaxMoney(target);
	ns.getServerMoneyAvailable(target);
}