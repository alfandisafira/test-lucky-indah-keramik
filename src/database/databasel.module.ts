import { Global, Module } from "@nestjs/common";
import { Pool } from "pg";

@Global()
@Module({
  providers: [
    {
      provide: 'DB_POOL',
      useFactory: () => {
        return new Pool({
          connectionString: "postgresql://neondb_owner:npg_LFq3trHZ0OjT@ep-square-field-a8k7kab7-pooler.eastus2.azure.neon.tech/test_lucky_indah_keramik?sslmode=require&channel_binding=require",
        });
      },
    },
  ],
  exports: ['DB_POOL']
})

export class DatabaseModule {}