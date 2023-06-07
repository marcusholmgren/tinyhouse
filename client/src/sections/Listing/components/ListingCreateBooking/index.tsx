/*
import React from "react";
import { Button, Card, DatePicker, Divider, Typography } from "antd";
import moment, { Moment } from "moment";
import { displayErrorMessage, formatListingPrice } from "../../../../lib/utils";

const { Paragraph, Title } = Typography;

interface Prop {
    price: number;
    checkInDate: Moment | null;
    checkOutDate: Moment | null;
    setCheckInDate: (checkInDate: Moment | null) => void;
    setCheckOutDate: (checkOutDate: Moment | null) => void;
}

export function ListingCreateBooking({
    price,
    checkInDate,
    checkOutDate,
    setCheckInDate,
    setCheckOutDate,
}: Prop) {
    const disabledDate = (currentDate?: Moment) => {
        if (currentDate) {
            const dateIsBeforeEndOfDay = currentDate.isBefore(
                moment().endOf("day")
            );

            return dateIsBeforeEndOfDay;
        } else {
            return false;
        }
    };

    const verifyAndSetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
        if (checkInDate && selectedCheckOutDate) {
            if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
                return displayErrorMessage(
                    `You can't book date of check out to be prior to check in!`
                );
            }
        }
        setCheckOutDate(selectedCheckOutDate);
    };

    const checkOutInputDisabled = !checkInDate;
    const buttonDisabled = !checkInDate || !checkOutDate;

    return (
        <div className="listing-booking">
            <Card className="listing-booking__card">
                <div>
                    <Paragraph>
                        <Title
                            level={2}
                            className="listing-booking__card-title"
                        >
                            {formatListingPrice(price)}
                            <span>/day</span>
                        </Title>
                    </Paragraph>
                    <Divider />
                    <div className="listing-booking__card-date-picker">
                        <Paragraph strong>Check In</Paragraph>
                        <DatePicker
                            value={checkInDate}
                            onChange={setCheckInDate}
                            onOpenChange={() => setCheckOutDate(null)}
                            disabledDate={disabledDate}
                            showToday={false}
                        />
                    </div>
                    <div className="listing-booking__card-date-picker">
                        <Paragraph strong>Check Out</Paragraph>
                        <DatePicker
                            value={checkOutDate}
                            onChange={verifyAndSetCheckOutDate}
                            format="YYYY-MM-DD"
                            disabledDate={disabledDate}
                            showToday={false}
                            disabled={checkOutInputDisabled}
                        />
                    </div>
                </div>
                <Divider />
                <Button
                    disabled={buttonDisabled}
                    size="large"
                    type="primary"
                    className="listing-booking__card-cta"
                >
                    Request to book!
                </Button>
            </Card>
        </div>
    );
}
*/

export function ListingCreateBooking() {
    return <h2>TODO</h2>;
}
