import axios from "axios"
import React, { useEffect, useState } from "react"

const WatchModal = ({ pageName }) => {
  const [showModal, setShowModal] = useState(true)

  const [order, setOrder] = useState(null)

  useEffect(() => {
    axios
      .get(
        "https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/123"
      )
      .then((response) => {
        const regex = /\,(?!\s*?[\{\[\"\'\w])/g
        let cleaned_data = response.data.replace(regex, "")
        cleaned_data = JSON.parse(cleaned_data)
        console.log(cleaned_data.listing.images[0].image.url)
        setOrder(cleaned_data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const acceptOrder = () => {
    axios
      .post(
        "https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/123/accept"
      )
      .then((response) => {
        console.log("Order accepted: ", response.status)
      })
      .catch((error) => {
        console.error("Error accepting order: ", error)
      })
  }

  const declineOrder = () => {
    axios
      .post(
        "https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/123/decline"
      )
      .then((response) => {
        console.log("Order declined: ", response.status)
      })
      .catch((error) => {
        console.error("Error declining order: ", error)
      })
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    console.log(showModal)
  }, [showModal])

  return (
    <>
      <div className="flex items-center justify-center flex-col mt-10">
        <button
          className="bg-[#1A3A32] font-semibold w-[50%] text-white py-3 px-4 rounded-[1.25rem]"
          onClick={toggleModal}
        >
          Open Modal
        </button>
      </div>

      {showModal && order ? (
        <div className="flex relative w-full items-center justify-center h-[120vh] flex-col ">
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 my-auto">
            <div className={showModal ? `max-w-xs md:max-w-[54rem] mx-auto rounded-2xl bg-white shadow-lg z-20 p-4 pb-7 translate-y-[5%] md:translate-y-[20%] overflow-y-scroll md:overflow-y-auto max-h-[90vh] transition-all duration-300 ease-in-out` : null}>
              <div className="text-right">
                <button
                  onClick={toggleModal}
                  className="text-right text-gray-700 hover:text-gray-900"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid md:grid-cols-2 rounded-lg gap-2">
                <div className="flex flex-col justify-between">
                  <div className="px-10 pt-10 mx-5">
                    <h2 className="text-base uppercase font-semibold text-gray-400 mb-4">
                      congrats!
                    </h2>
                    <div className="text-gray-700 mb-8 text-3xl">
                      Your watch sold!
                    </div>
                    <p className="text-gray-500 text-sm mb-1">
                      You have 1 business day to accept the sale.
                    </p>
                    <p className="text-gray-500 text-sm mb-1">
                      If you do not accept it will be automatically
                    </p>
                    <p className="text-gray-500 text-sm mb-2">rejected.</p>
                  </div>
                  <div className="px-6 mx-5">
                    <div className="flex flex-col items-center gap-4 justify-center mb-4">
                      <button
                        className="bg-[#1A3A32] font-semibold w-[100%] text-white py-4 px-4 rounded-[1.45rem] mr-2"
                        onClick={acceptOrder}
                      >
                        Accept sale
                      </button>
                      <button
                        className="bg-transparent font-semibold text-[#1A3A32] border-none py-4 px-4 rounded-lg border"
                        onClick={declineOrder}
                      >
                        Reject sale
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-3xl mx-5">
                  <div className="py-6">
                    <hr className="mb-3 w-full border-gray-300" />
                    <div className="grid grid-cols-4">
                      <div className="col-span-3">
                        <div className="font-semibold">
                          {order.listing.model.displayName}
                        </div>
                        <div className="font-semibold">
                          {order.listing.model.brand.displayName}
                        </div>
                        <div className="text-s text-gray-500 py-2 ">
                          {order.listing.condition} /{" "}
                          {order.listing.manufactureYear}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <img
                          src={`${order.listing.images[0].image.url}`}
                          alt="/"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <hr className="my-3 w-full border-gray-300" />
                    <div className="grid grid-cols-3">
                      <div className="text-left col-span-2 text-gray-500">
                        <div className="text-sm py-2">Selling Price</div>
                        <div className="text-sm py-2">
                          Level 1 Commission (6.5%)
                        </div>
                        <div className="text-sm py-2">Seller fee</div>
                        <div className="text-sm py-2">Insured Shipping</div>
                        <div className="text-sm py-2 text-[#1D7D67]">
                          Bezel authentication
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm py-2 pt-4 font-semibold">
                          {(order.salePriceCents / 100).toLocaleString(
                            "en-US",
                            { style: "currency", currency: "USD" }
                          )}
                        </div>
                        <div className="text-sm py-2 text-gray-500">
                          {(
                            (order.commissionRateBips / 10000) *
                            (order.salePriceCents / 100)
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                        <div className="text-sm py-2 text-gray-500">
                          {(order.sellerFeeCents / 100).toLocaleString(
                            "en-US",
                            { style: "currency", currency: "USD" }
                          )}
                        </div>
                        <div className="text-sm py-2 text-gray-500">Free</div>
                        <div className="text-sm py-2 text-[#1D7D67] ">Free</div>
                      </div>
                    </div>
                    <hr className="my-3 w-full border-gray-300" />
                    <div className="grid grid-cols-2 font-bold">
                      <div className="text-left">
                        <div className="text-sm py-2">Earnings</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm py-2">
                          {(
                            order.salePriceCents / 100 +
                            (order.commissionRateBips / 10000) *
                              (order.salePriceCents / 100) +
                            order.sellerFeeCents / 100
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default WatchModal
