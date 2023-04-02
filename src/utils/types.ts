export type User = {
    name: {
        first: string;
        last: string;
    };
    email: string;
};

export type FormData = {
    firstname?: string;
    lastname?: string;
    email?: string;
    car: string;
    purchasedate: string;
};
