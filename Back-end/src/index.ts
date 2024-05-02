import app from './app'
import { connectDB } from './config/dbConfig';

async function main() {
    try {
        await connectDB();
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
          console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();