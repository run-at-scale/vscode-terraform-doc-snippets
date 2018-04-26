import fsExtra = require("fs-extra");

export function cleanup(dir) {
    console.log(`Cleaning up ${dir}`);
    fsExtra.remove(dir, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log(`Deleted ${dir}`);
    });
}
