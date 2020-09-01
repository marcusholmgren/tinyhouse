import React from "react";
import { Alert, Skeleton, Divider } from "antd";
import "./styles/listings-skeleton.css";

interface ListingsSkeletonProp {
    title: string;
    error?: boolean;
}

export function ListingsSkeleton({title, error = false}: ListingsSkeletonProp) {
    const errorAlert = error ? (
        <Alert
            type="error"
            message={
                <>
                    Oh no! Something went wrong - please try again later
                    <span role="img" aria-label="Sad face emoji">
                        😞
                    </span>
                </>
            }
            className="listing-skeleton__alert"
        />
    ) : null;
    return (
        <div className="listings-skeleton">
            {errorAlert}
            <h2>
                {title}
                {[...Array(3)].map((_, index) => (
                    <div key={index}>
                        <Skeleton active paragraph={{rows: 1}}/>
                        <Divider/>
                    </div>
                ))}
            </h2>
        </div>
    );
}
