const fs = require('fs');
const yaml = require('js-yaml');

export class ZipToTz {
    async short(zip: string): Promise<string> {
        return await this.getTimeZone(zip, 'timezones_to_zipcodes');
    }

    async full(zip: string): Promise<string> {
        return await this.getTimeZone(zip, 'timezones_to_zipcodes(full name)');
    }

    private async getTimeZone(zip: string, fileName: string): Promise<string> {
        const value = zip.replace(/\s/g, '');
        if (!Number.isInteger(Number(value)) || value.length != 5) {
            console.log('Invalid format or zipCode length')
        }
        const filePath = process.cwd();
        let fileContents = await fs.readFileSync(`${filePath}/node_modules/zip-to-timezone/src/.${fileName}.yml`, 'utf8');
        let data = yaml.safeLoad(fileContents);
        for (const [timezone] of Object.entries(data)) {
            const found = data[timezone].find(element => element === value)
            if (found)
                return timezone
        }
        return 'Not found'
    }
}


//Eastern Time  - America/New_York
//Central Time  - America/Chicago
// Mountain Time - America/Denver
// Pacific Time - America/Los_Angeles
// Arizona  -  America/Phoenix
// Hawaii  - Pacific/Honolulu
// Alaska  - America/Anchorage