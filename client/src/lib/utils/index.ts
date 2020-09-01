import { message, notification } from "antd";

export const iconColor = "#1890ff";

export function formatListingPrice(price: number, round: boolean = true): string {
 const formattedListingPrice = round ? Math.round(price/100) : price/100;
 return `$${formattedListingPrice}`;
}



export function displaySuccessNotification(
    message: string,
    description?: string
) {
    return notification["success"]({
        message,
        description,
        placement: "topLeft",
        style: {
            marginTop: 50,
        },
    });
}

export function displayErrorMessage(error: string) {
    return message.error(error);
}
