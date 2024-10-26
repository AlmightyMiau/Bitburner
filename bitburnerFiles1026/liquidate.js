/** @param {NS} ns */
export async function main(ns) {
	const syms = ns.stock.getSymbols();
	ns.scriptKill("stocks.js", "home");
	ns.scriptKill("stocker.js", "home");
	for (let i = 0; i < syms.length; i++) {
		let shares = ns.stock.getMaxShares(syms[i]);
		ns.stock.sellStock(syms[i], shares);
	}
}