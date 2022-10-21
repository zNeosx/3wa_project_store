import Skeleton from "react-loading-skeleton";

export const OrderCardSkeleton = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, index) => (
      <div className="order-card-skeleton" key={index}>
        <Skeleton height={21} />
        <Skeleton height={21} />
        <Skeleton height={100} />
        <Skeleton height={21} />
      </div>
    ));
};
