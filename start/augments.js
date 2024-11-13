/** @param {NS} ns */
export async function main(ns) {

	ns.tail();
	ns.moveTail(950, 300);
	ns.resizeTail(250, 100);

	// ns.disableLog("disableLog");
	// ns.disableLog("clearLog");
	ns.disableLog("sleep");
	// ns.disableLog("singularity.getAugmentationRepReq");
	// ns.disableLog("singularity.getAugmentationPrice");
	ns.disableLog("singularity.donateToFaction");
	ns.disableLog("getServerMoneyAvailable");
	ns.clearLog();

	// Buffer time after game startup so it will read properly
	await ns.sleep(6000);

	// INITIALIZE
	let owned = ns.singularity.getOwnedAugmentations(true);  // Get the currently owned augments
	const baseprice = ns.read("augbaseprice.txt");           // Get the base price from the start of the installation
	let n;                                                   // No clue

	while (true) {
		let factions = ns.getPlayer().factions;
		for (let i = 0; i < factions.length; i++) {
			if (factions[i] == "Shadows of Anarchy") { continue; }

			let augs = ns.singularity.getAugmentationsFromFaction(factions[i]);
			
			for (let j = 0; j < augs.length; j++) {
				if (augs[j] == "NeuroFlux Governor" || owned.includes(augs[j])) { continue; }
				if (augs[j] == "The Red Pill") {
					if (ns.singularity.getFactionFavor(factions[i]) < 150) {
						if ((ns.singularity.getFactionFavorGain(factions[i]) + ns.singularity.getFactionFavor(factions[i])) > 150) {
							ns.singularity.installAugmentations("start.js");
						}
					} else if (ns.singularity.getFactionRep(factions[i]) >= ns.singularity.getAugmentationRepReq(augs[j])) {
						ns.singularity.purchaseAugmentation(factions[i], augs[j]);
						await ns.sleep(500);
						ns.singularity.installAugmentations("start.js");
					} else if (ns.singularity.getFactionRep(factions[i]) < ns.singularity.getAugmentationRepReq(augs[j]) && ns.getPlayer().money > 10000000) {
						ns.singularity.donateToFaction(factions[i], (ns.getPlayer().money - 10000000));
					}
				}

				if (ns.singularity.getFactionRep(factions[i]) > ns.singularity.getAugmentationRepReq(augs[j])) {
					if (ns.getPlayer().money > ns.singularity.getAugmentationPrice(augs[j])) {
						if (ns.singularity.purchaseAugmentation(factions[i], augs[j])) {
							ns.print("Buying ", augs[j]);
							owned.push(augs[j]);
						}
					}
				} else if (!n) {
					ns.singularity.workForFaction(factions[i], "hacking", false);
					n = factions[i];
				}
			}
			if (augs.length == 0 && n == factions[i]) {
				n = "";
			}
		}
		if ((ns.singularity.getAugmentationPrice("NeuroFlux Governor") / baseprice) > 16000) {
			ns.singularity.installAugmentations("start.js");
		}
		if (owned.includes("The Red Pill") && !ns.singularity.getOwnedAugmentations(false).includes("The Red Pill")) {
			ns.singularity.installAugmentations("start.js");
		}
		if (ns.singularity.getOwnedAugmentations(false).includes("The Red Pill")) {
			ns.singularity.workForFaction("Sector-12", "hacking", false);
			while (true) {
				ns.clearLog();
				// if ((Date.now() - ns.getResetInfo().lastAugReset) > 3600000) { 
				// 	while (ns.singularity.getAugmentationPrice("NeuroFlux Governor") < ns.getPlayer().money) {
				// 		if (ns.singularity.getAugmentationRepReq("NeuroFlux Governor") < ns.singularity.getFactionRep("Sector-12")) { 
				// 			ns.singularity.purchaseAugmentation("Sector-12", "NeuroFlux Governor"); 
				// 		} else { 
				// 			ns.singularity.donateToFaction("Sector-12", ns.getPlayer().money - ns.singularity.getAugmentationPrice("NeuroFlux Governor") - 10e9)
				// 		}
				// 		await ns.sleep(100);
				// 	}
				// 	try { ns.singularity.installAugmentations("start.js"); }
				// 	catch {
				// 		while (ns.singularity.installAugmentations("start.js")) {
				// 			try { ns.singularity.purchaseAugmentation("Sector-12", "NeuroFlux Governor"); }
				// 			catch {}
				// 			await ns.sleep(100);
				// 		}
				// 	} 
				// } else { 
				// 	ns.print("Time since last reset: ", Math.round((Date.now() - ns.getResetInfo().lastAugReset) / 60), " minutes"); 
				// }
				if ((ns.singularity.getAugmentationPrice("NeuroFlux Governor") / baseprice) > 16000) {
					ns.singularity.installAugmentations("start.js");
				} else { 
					ns.print("Current price multiplier: ", Math.round(ns.singularity.getAugmentationPrice("NeuroFlux Governor") / baseprice));
					ns.print("Current price: ", formatLargeNumber(Math.round(5*10e10 + (ns.singularity.getAugmentationPrice("NeuroFlux Governor")))));
				}
				if (ns.getPlayer().money > (5*10e10 + ns.singularity.getAugmentationPrice("NeuroFlux Governor"))) {
					if (ns.singularity.getAugmentationRepReq("NeuroFlux Governor") <= ns.singularity.getFactionRep("Sector-12")) {
						ns.singularity.purchaseAugmentation("Sector-12", "NeuroFlux Governor");
					}
				} else { ns.print("Need more money: ", (100 * Math.floor(ns.getPlayer().money) / Math.ceil(5*10e10 + ns.singularity.getAugmentationPrice("NeuroFlux Governor"))).toFixed(4), "%")}

				if (ns.singularity.getFactionRep("Sector-12") < ns.singularity.getAugmentationRepReq("NeuroFlux Governor")) {
					ns.print("Current reputation: ", formatLargeNumber(ns.singularity.getFactionRep("Sector-12")));
					ns.print("Reputation needed: ", formatLargeNumber(ns.singularity.getAugmentationRepReq("NeuroFlux Governor") - ns.singularity.getFactionRep("Sector-12")));
					if (ns.getPlayer().money > (5*10e10 + ns.singularity.getAugmentationPrice("NeuroFlux Governor"))) {
						ns.singularity.donateToFaction("Sector-12", ns.getPlayer().money - (5*10e10 + ns.singularity.getAugmentationPrice("NeuroFlux Governor")));
					}
				}
				await ns.sleep(6000);
			}
		}
		await ns.sleep(6000);
	}
}

function formatLargeNumber(number) {
    const suffixes = ['', ' thousand', ' million', ' billion', ' trillion', ' quadrillion', ' quintillion', ' sextillion', ' septillion', ' octillion', ' nonillion', ' decillion'];
    let suffixIndex = 0;

    while (number >= 1000 && suffixIndex < suffixes.length - 1) {
        number /= 1000;
        suffixIndex++;
    }

    return number.toFixed(2).replace(/\.00$/, '') + suffixes[suffixIndex];
}