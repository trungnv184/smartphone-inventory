import { INestApplicationContext } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Model as MongooseModel } from 'mongoose';

import { Model } from 'src/inventory/schemas/model.schema';
import { DataMemory } from 'src/inventory/schemas/data-memory.schema';
import { BodyColor } from 'src/inventory/schemas/body-color.schema';
import { Manufacturer } from 'src/inventory/schemas/manufacturer.schema';

export async function executeMemorySeed(app: INestApplicationContext) {
  // const app = await NestFactory.createApplicationContext(MemorySeedModule);

  const manufacturerModel = app.get<MongooseModel<Manufacturer>>(getModelToken(Manufacturer.name));
  const modelModel = app.get<MongooseModel<Model>>(getModelToken(Model.name));
  const bodyColorModel = app.get<MongooseModel<BodyColor>>(getModelToken(BodyColor.name));
  const dataMemoryModel = app.get<MongooseModel<DataMemory>>(getModelToken(DataMemory.name));

  const manufacturers = await manufacturerModel.insertMany([
    { name: 'Apple' },
    { name: 'Samsung' },
    { name: 'Xiaomi' },
  ]);

  // 2. Seed BodyColors
  const bodyColors = await bodyColorModel.insertMany([
    { color: 'Black' },
    { color: 'White' },
    { color: 'Blue' },
  ]);

  // 3. Seed DataMemories
  const dataMemories = await dataMemoryModel.insertMany([
    { size: '128GB' },
    { size: '256GB' },
    { size: '512GB' },
  ]);

  // 4. Seed Models
  const models = await modelModel.insertMany([
    {
      name: 'iPhone 13',
      manufacturerId: manufacturers[0]._id, // Apple
      releaseDate: new Date('2021-09-01'),
      endSupportDate: new Date('2026-12-31'),
      bodyColors: [bodyColors[0]._id, bodyColors[1]._id], // Black, White
      dataMemories: [dataMemories[0]._id, dataMemories[1]._id], // 128GB, 256GB
    },
    {
      name: 'Galaxy S21',
      manufacturerId: manufacturers[1]._id, // Samsung
      releaseDate: new Date('2021-01-29'),
      endSupportDate: new Date('2026-01-29'),
      bodyColors: [bodyColors[1]._id, bodyColors[2]._id], // White, Blue
      dataMemories: [dataMemories[1]._id, dataMemories[2]._id], // 256GB, 512GB
    },
    {
      name: 'Mi 11',
      manufacturerId: manufacturers[2]._id, // Xiaomi
      releaseDate: new Date('2021-02-08'),
      endSupportDate: new Date('2026-02-08'),
      bodyColors: [bodyColors[0]._id, bodyColors[2]._id], // Black, Blue
      dataMemories: [dataMemories[0]._id, dataMemories[2]._id], // 128GB, 512GB
    },
  ]);

  console.log('✅ Seeded in-memory MongoDB with manufacturers, colors, memory, model.');
  console.log({ manufacturers, bodyColors, dataMemories, models });

  console.log('-- Example Request Payload to create SmartPhone Inventory --');
  const exampleRequestPayload = {
    manufacturerId: manufacturers[0]._id,
    modelId: models[0]._id,
    bodyColorId: bodyColors[0]._id,
    dataMemoryId: dataMemories[0]._id,
    osVersion: 'iOS 15.0',
    price: 999.99,
    yearOfManufacture: 2021,
  };

  console.log(JSON.stringify(exampleRequestPayload, null, 2));

  console.log('--- Seed data completed ---');
}
