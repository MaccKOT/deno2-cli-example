// CLI usage: deno main.ts -r Aspen
import { parseArgs } from "jsr:@std/cli/parse-args";

// some data
const resorts = {
    Whistler: {
        elevation: 2214,
        snow: "Powder",
        expectedSnowfall: "20",
    },
    Aspen: {
        elevation: 7945,
        snow: "Packed powder",
        expectedSnowfall: "15",
    },
    Vail: {
        elevation: 8120,
        snow: "Packed powder",
        expectedSnowfall: "25",
    },
};

const args = parseArgs(Deno.args, {
    alias: {
        resort: "r",
        help: "h",
    },
    default: {
        resort: "Whistler",
    },
});

const resortName = args.resort as keyof typeof resorts;
const resort = resorts[resortName];

if (args.help) {
    console.log(`
        usage: ski-cli --resort <resort_name>
        -h  --help      Show help
        -r  --resort    Name of the ski resort (default is Whistler)
        `);
    Deno.exit(0);
}

if (!resort) {
    console.error(
        `Resort ${resortName} not found. Try Whistler, Aspen or Vail.`,
    );
    Deno.exit(1);
}

//%c , "color: blue" - internal Deno colors and background for terminal, no need chalks.js anymore
console.log(
    `%c
    Resort: ${resortName}
    Elevation: ${resort.elevation} feet
    Snow conditions: ${resort.snow}
    Expected snowfall: ${resort.expectedSnowfall}
    `,
    "color: blue",
);

// You can compile file with `deno compile main.ts`
