import { describe, it } from "vitest";

import { createMockHttps } from "@/mocks";
import { dataDragonSyncChampionsToDatabase } from "@/utilities";

/**
 * Vitest tests for sync-database.utilities.ts
 *
 * This section contains tests for the
 * `dataDragonSyncChampionsToDatabase`,
 * `dataDragonSyncLanguagesToDatabase`,
 * `leagueScraperSyncAccountsToDatabase`
 * functions.
 */

/**
 * Test suite for sync-database.utilities.ts
 */
describe("sync-database.utilities.ts", () => {
  /**
   * Test suite for dataDragonSyncChampionsToDatabase function.
   */
  describe("dataDragonSyncChampionsToDatabase", () => {
    // Data Dragon API responses.
    // @ts-expect-error
    const mockOKChampionResponse = {
      data: {
        Aatrox: {
          blurb:
            "Once honored defenders of Shurima against the Void, Aatrox and his brethren would eventually become an even greater threat to Runeterra, and were defeated only by cunning mortal sorcery. But after centuries of imprisonment, Aatrox was the first to find...",
          id: "Aatrox",
          image: {
            full: "Aatrox.png",
            group: "champion",
            h: 48,
            sprite: "champion0.png",
            w: 48,
            x: 0,
            y: 0,
          },
          info: { attack: 8, defense: 4, difficulty: 4, magic: 3 },
          key: "266",
          name: "Aatrox",
          partype: "Blood Well",
          stats: {
            armor: 38,
            armorperlevel: 4.45,
            attackdamage: 60,
            attackdamageperlevel: 5,
            attackrange: 175,
            attackspeed: 0.651,
            attackspeedperlevel: 2.5,
            crit: 0,
            critperlevel: 0,
            hp: 650,
            hpperlevel: 114,
            hpregen: 3,
            hpregenperlevel: 1,
            movespeed: 345,
            mp: 0,
            mpperlevel: 0,
            mpregen: 0,
            mpregenperlevel: 0,
            spellblock: 32,
            spellblockperlevel: 2.05,
          },
          tags: ["Fighter", "Tank"],
          title: "the Darkin Blade",
          version: "13.23.1",
        },
        Ahri: {
          blurb:
            "Innately connected to the magic of the spirit realm, Ahri is a fox-like vastaya who can manipulate her prey's emotions and consume their essence—receiving flashes of their memory and insight from each soul she consumes. Once a powerful yet wayward...",
          id: "Ahri",
          image: {
            full: "Ahri.png",
            group: "champion",
            h: 48,
            sprite: "champion0.png",
            w: 48,
            x: 48,
            y: 0,
          },
          info: { attack: 3, defense: 4, difficulty: 5, magic: 8 },
          key: "103",
          name: "Ahri",
          partype: "Mana",
          stats: {
            armor: 21,
            armorperlevel: 4.7,
            attackdamage: 53,
            attackdamageperlevel: 3,
            attackrange: 550,
            attackspeed: 0.668,
            attackspeedperlevel: 2.2,
            crit: 0,
            critperlevel: 0,
            hp: 590,
            hpperlevel: 96,
            hpregen: 2.5,
            hpregenperlevel: 0.6,
            movespeed: 330,
            mp: 418,
            mpperlevel: 25,
            mpregen: 8,
            mpregenperlevel: 0.8,
            spellblock: 30,
            spellblockperlevel: 1.3,
          },
          tags: ["Mage", "Assassin"],
          title: "the Nine-Tailed Fox",
          version: "13.23.1",
        },
      },
      format: "standAloneComplex",
      type: "champion",
      version: "13.23.1",
    };
    // @ts-expect-error
    const mockForbiddenChampionResponse = {
      Error: {
        Code: "AccessDenied",
        HostId: "UNKNOWN_GENERATED_HOST_ID",
        Message: "Access Denied",
        RequestId: "UNKNOWN_GENERATED_REQUEST_ID",
      },
    };

    /**
     * Test for `dataDragonSyncChampionsToDatabase` function.
     *
     * This test checks that `dataDragonSyncChampionsToDatabase` function
     * It checks the following cases:
     * - The case where the url is not valid.
     */
    it("should", async () => {
      createMockHttps(403);
      await dataDragonSyncChampionsToDatabase();
    });
  });

  /**
   * Test suite for leagueScraperSyncAccountsToDatabase function.
   */
  describe.skip("dataDragonSyncLanguagesToDatabase", () => {});

  /**
   * Test suite for leagueScraperSyncAccountsToDatabase function.
   */
  describe.skip("leagueScraperSyncAccountsToDatabase", () => {});
});
