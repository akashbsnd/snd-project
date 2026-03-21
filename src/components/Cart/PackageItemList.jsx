import PackageCartItem from "./PackageCartItem";

export default function PackageItemList() {
  const { cartItems, setCartItems } = useContext(CartContext) || { cartItems: [], setCartItems: () => {} };
  return (
    <div className="py-4 px-4 md-lg:max-h-[calc(100vh-280px)] overflow-y-auto">
      <div className="">
        {cartItems.map((cartItem, i) => {
          return (
            <PackageCartItem
              key={i}
              addOns={cartItem.addOns}
              packageName={cartItem.packageName}
              optionName={cartItem.packageOption.name}
              optionPrice={cartItem.packageOption.price}
            />
          );
        })}
      </div>
    </div>
  );
}
