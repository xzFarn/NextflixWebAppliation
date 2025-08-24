# CleanArch App

แอปพลิเคชัน Next.js ที่ใช้ Clean Architecture Pattern พร้อมกับ TypeScript และ Tailwind CSS

## 🏗️ โครงสร้าง Clean Architecture

โปรเจคนี้ใช้ Clean Architecture Pattern ที่แบ่งออกเป็น 4 layers หลัก:

```
src/
├── domain/           # Domain Layer (แกนกลางของธุรกิจ)
│   ├── entities/     # Business entities
│   ├── repositories/ # Repository interfaces
│   └── usecases/     # Business use cases
├── application/      # Application Layer (business logic)
│   └── services/     # Application services
├── infrastructure/   # Infrastructure Layer (external concerns)
│   ├── repositories/ # Repository implementations
│   └── di/          # Dependency injection
└── presentation/     # Presentation Layer (UI)
    ├── components/   # React components
    ├── hooks/        # Custom hooks
    └── pages/        # Page components
```

## 📁 รายละเอียดแต่ละ Layer

### 1. Domain Layer (`src/domain/`)
- **Entities**: ข้อมูลและ business rules หลัก
- **Repositories**: Interface สำหรับการเข้าถึงข้อมูล
- **Use Cases**: Business logic และ rules

### 2. Application Layer (`src/application/`)
- **Services**: จัดการ business logic และ orchestrate ระหว่าง layers
- **Validation**: การตรวจสอบข้อมูล
- **Error Handling**: จัดการ errors

### 3. Infrastructure Layer (`src/infrastructure/`)
- **Repositories**: Implementation ของ repository interfaces
- **DI Container**: Dependency injection container
- **External Services**: การเชื่อมต่อกับ external APIs

### 4. Presentation Layer (`src/presentation/`)
- **Components**: React components ที่ reusable
- **Hooks**: Custom hooks สำหรับ state management
- **Pages**: Page components ที่ใช้ใน Next.js

## 🚀 การใช้งาน

### การติดตั้ง
```bash
npm install
```

### การรันในโหมด Development
```bash
npm run start:dev
```

### การ Build
```bash
npm run build
```

## 🎯 ฟีเจอร์หลัก

- ✅ **User Management**: เพิ่ม แก้ไข ลบ ผู้ใช้
- ✅ **Clean Architecture**: โครงสร้างที่แยกความกังวลชัดเจน
- ✅ **TypeScript**: Type safety และ IntelliSense
- ✅ **Tailwind CSS**: Styling ที่ responsive และสวยงาม
- ✅ **Dependency Injection**: Loose coupling และ testability
- ✅ **Error Handling**: การจัดการ errors ที่ครอบคลุม

## 🔧 การเพิ่มฟีเจอร์ใหม่

### 1. สร้าง Entity
```typescript
// src/domain/entities/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  // ...
}
```

### 2. สร้าง Repository Interface
```typescript
// src/domain/repositories/IProductRepository.ts
export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  // ...
}
```

### 3. สร้าง Use Cases
```typescript
// src/domain/usecases/ProductUseCases.ts
export class ProductUseCases {
  constructor(private productRepository: IProductRepository) {}
  // ...
}
```

### 4. สร้าง Infrastructure Implementation
```typescript
// src/infrastructure/repositories/ProductRepository.ts
export class ProductRepository implements IProductRepository {
  // Implementation
}
```

### 5. สร้าง Application Service
```typescript
// src/application/services/ProductService.ts
export class ProductService {
  constructor(private productUseCases: ProductUseCases) {}
  // ...
}
```

### 6. สร้าง Presentation Components
```typescript
// src/presentation/components/ProductList.tsx
export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  // Component implementation
}
```

## 🧪 การทดสอบ

โครงสร้าง Clean Architecture ทำให้การเขียน tests ง่ายขึ้น:

- **Unit Tests**: ทดสอบ Use Cases และ Services
- **Integration Tests**: ทดสอบ Repository implementations
- **Component Tests**: ทดสอบ React components

## 📚 หลักการ Clean Architecture

1. **Dependency Rule**: Dependencies ชี้เข้าด้านใน (Domain → Application → Infrastructure)
2. **Separation of Concerns**: แต่ละ layer มีหน้าที่เฉพาะ
3. **Testability**: ทดสอบได้ง่ายและครอบคลุม
4. **Maintainability**: บำรุงรักษาและขยายได้ง่าย
5. **Independence**: ไม่ขึ้นกับ external frameworks

## 🛠️ เทคโนโลยีที่ใช้

- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Clean Architecture**: Software architecture pattern

## 📄 License

MIT License
