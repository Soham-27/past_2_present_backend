
export const yourCronJobFunction = async () => {
  try {
    // Your logic goes here
    // For example, you can perform database operations or any other tasks you need
    console.log(`Cron job is running...${new Date()}`);
    // Perform your operations here
  } catch (error) {
    console.error('Error in cron job:', error);
  }
};