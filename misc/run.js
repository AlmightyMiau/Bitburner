/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0];
	const script = ns.args[1];
	const scriptRam = ns.getScriptRam(script);
	ns.exec(script, "home", threads(ns, scriptRam), target);
	await ns.sleep(4000);
}

function threads(ns, scriptRam) {
    return Math.floor(((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) * 0.95) / scriptRam);
}