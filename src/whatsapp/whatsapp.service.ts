// whatsapp.service.ts
import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import * as QRCode from 'qrcode';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private readonly logger = new Logger(WhatsappService.name);
  private client: Client;
  private isReady = false;
  private currentQR: string | null = null;

  onModuleInit() {
    this.initClient();
  }

  private initClient() {
    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu',
        ],
      },
      webVersionCache: {
        type: 'remote',
        remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html',
      }
    });

    this.client.on('qr', async (qr) => {
      this.logger.log('QR Code generated');
      this.currentQR = await QRCode.toDataURL(qr);
    });

    this.client.on('ready', () => {
      this.isReady = true;
      this.currentQR = null; 
      this.logger.log('WhatsApp siap!');
    });

    this.client.on('disconnected', async (reason) => {
      this.isReady = false; 
      this.logger.warn(`Disconnected: ${reason}, restarting...`);
      
      await this.client.destroy();
      setTimeout(() => this.initClient(), 5000);
    });

    this.client.initialize();
  }

  getStatus(): { is_ready: boolean; qr: string | null } {
    return {
      is_ready: this.isReady,
      qr: this.currentQR,
    };
  }

  async sendExcel(phoneNumber: string, filePath: string, caption?: string): Promise<void> {
    if (!this.isReady) {
      throw new Error('WhatsApp belum siap');
    }

    const chatId = phoneNumber.startsWith('0')
      ? `62${phoneNumber.slice(1)}@c.us`
      : `${phoneNumber}@c.us`;

    const media = MessageMedia.fromFilePath(filePath);
    await this.client.sendMessage(chatId, media, { caption: caption ?? 'Berikut file Excel-nya.' });

    this.logger.log(`File terkirim ke ${chatId}`);
  }

  async logout(): Promise<void> {
    await this.client.logout();
    this.isReady = false;
    this.currentQR = null;

    setTimeout(() => this.initClient(), 3000); 
  }
}