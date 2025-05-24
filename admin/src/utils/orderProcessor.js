// utils/orderProcessor.js
const processScheduledOrders = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Get all scheduled orders for tomorrow
  const scheduledOrders = await Order.find({
    status: ORDER_STATUS.SCHEDULED,
    deliveryDate: {
      $gte: startOfDay(tomorrow),
      $lt: endOfDay(tomorrow),
    },
  });

  // Update their status to QUEUED
  await Order.updateMany(
    {
      _id: { $in: scheduledOrders.map((order) => order._id) },
    },
    {
      $set: { status: ORDER_STATUS.QUEUED },
    }
  );

  // Notify vendors
  for (const order of scheduledOrders) {
    await notifyVendor(order);
  }
};

// Cron job (using node-cron)
cron.schedule("0 2 * * *", async () => {
  try {
    await processScheduledOrders();
    console.log("Successfully processed scheduled orders");
  } catch (error) {
    console.error("Error processing scheduled orders:", error);
  }
});
