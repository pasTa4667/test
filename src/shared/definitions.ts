type Hours = 
  "01"|
  "02"|
  "03"|
  "04"|
  "05"|
  "06"|
  "07"|
  "08"|
  "09"|
  "10"|
  "11"|
  "12"|
  "13"|
  "14"|
  "15"|
  "16"|
  "17"|
  "18"|
  "19"|
  "20"|
  "21"|
  "22"|
  "23"|
  "00";

type Minutes = 
    "15"|
    "30"|
    "45"|
    "00";

export type Time = `${Hours}:${Minutes}`;


export const generateTimes = (): Time[] => {
    const times: string[] = [];
    
    // Generate hours
    for (let hour = 0; hour < 24; hour++) {
        const hourStr = hour.toString().padStart(2, "0"); // Ensure two digits (e.g., "01")
        
        // Generate minutes
        for (let min of ["00", "15", "30", "45"]) {
            times.push(`${hourStr}:${min}`);
        }
    }
    
    return times as Time[];
};

export const getPureDate = (date: Date) => {
    return date.toISOString().split('T')[0];
}

export const cities = ["Munich", "Berlin", "Stanford", "Neustadt", "Springfield"];

type Path<T> = T extends object
    ? { [Key in keyof T]: [Key] | [Key, ...Path<T[Key]>] }[keyof T]
    : never;

export type Product = {
    id: number;
    name: string,
    description: string,
    ean: string,
    upc: string,
    image: string,
    images: Image[],
    net_price: number,
    taxes: number,
    price: number,
    categories: string[],
    tags: string[]
}

export type Image = {
    title: string,
    description: string,
    url: string,
}

export const tags = ["velit", "cum", "sed", "occaecati", "et", "eum", "mollita", "enim", "quidem"]

export function debounce<T extends (...args: any[]) => any>(fn: T, delay = 300) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(args);
        }, delay);
    }
}

export function brand<
    PrimitiveType,
    BrandName extends string,
    Brand extends PrimitiveType & { __brand: BrandName}
    >(
        isTypeFn: (input: PrimitiveType) => boolean,
        name: BrandName
    ): [(input: PrimitiveType) => input is Brand, Brand] {
        const isBrand = function(input: PrimitiveType): input is Brand {
            return isTypeFn(input);
        }
        return [isBrand, {} as Brand]
    }


export function isValidPlz(value: string) {
    return value.length === 5 && !isNaN(Number(value));
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}

// filters shop list for max distance to customer in km
function filterForDistance(shops: { lat: number, long: number }[], userLat: number, userLong: number, maxDist: number) {
    return shops.filter((coords) => (
        haversineDistance(coords.lat, coords.long, userLat, userLong) < maxDist
    ));
}


