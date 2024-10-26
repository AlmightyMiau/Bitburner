/** @param {NS} ns */
export async function main(ns) {
	// What server will be targeted?
	let target = ns.args[0];
	if (target === undefined) {
		ns.exit();
	}
	const securityThresh = ns.getServerMinSecurityLevel(target) + 5;
	ns.getServerSecurityLevel(target);
	ns.getServerMaxMoney(target);
	ns.getServerMoneyAvailable(target);

	while (ns.getServerSecurityLevel(target) > (securityThresh)) {
		// If the server's security level is above our threshold, weaken it
		await ns.weaken(target);
	}
	while (ns.getServerMoneyAvailable(target) < ns.getServerMaxMoney(target)) {
		// If the server's security level is above our threshold, weaken it
		if (ns.getServerSecurityLevel(target) > (securityThresh)) {
			await ns.weaken(target);
		} else {
			await ns.grow(target);
		}
	}
	while (ns.getServerSecurityLevel(target) > (securityThresh)) {
		// If the server's security level is above our threshold, weaken it
		await ns.weaken(target);
	}
	await ns.sleep(500);
	ns.getServerMinSecurityLevel(target);
	ns.getServerSecurityLevel(target);
	ns.getServerMaxMoney(target);
	ns.getServerMoneyAvailable(target);
}