import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConfigService } from '@nestjs/config';

let mongod: MongoMemoryServer | null = null;
export const getMongoConfig = async (): Promise<{ uri: string }> => {
  const configService = new ConfigService();
  const useMemoryDb = configService.get<boolean>('USE_MEMORY_DB');

  if (useMemoryDb) {
    // Check if mongod is already started
    if (mongod) {
      console.log('Memory MongoDB is already running');
      return {
        uri: mongod.getUri(),
      };
    }

    mongod = await MongoMemoryServer.create({
      instance: {
        port: 27017, // Default MongoDB port
      },
      binary: {
        version: '4.4.10', // Use MongoDB 4.4.x
      },
    });

    console.log(`Memory MongoDB started at: ${mongod.getUri()}`);
    return {
      uri: mongod.getUri(),
    };
  }

  const mongoUri = configService.get<string>('MONGO_URI');

  if (!mongoUri) {
    throw new Error('Please define MONGO_URI in your environment variables');
  }

  return {
    uri: mongoUri,
  };
};

export const closeMongoConnection = async () => {
  if (mongod) {
    await mongod.stop();
  }
};
