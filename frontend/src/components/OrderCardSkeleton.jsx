import Skeleton from "react-loading-skeleton";

export const OrderCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="order-card-skeleton" key={index}>
        <Skeleton width={60} height={21} />
        <Skeleton width={250} height={35} />
        <Skeleton height={310} />
        <Skeleton height={40} />
      </div>
    ));
};
