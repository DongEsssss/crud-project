interface Users {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    phone?: string;
    website?: string;
    address?: Address
    company?: company
}

interface Address {
    street?: string;
    suite?: string;
    city?: string;
    zipcode?: string;
    geo?: geo
}

interface geo {
    lat?: string;
    lng?: string;
}

interface company {
    name?: string;
    catchPhrase?: string;
    bs?: string;
}