import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    app.listen(config.port, () => {
      console.log(
        `Connected to ordermanagement databse and app is running on port ${config.port}`
      );
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

main();
