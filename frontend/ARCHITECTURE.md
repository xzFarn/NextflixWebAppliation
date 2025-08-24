# Clean Architecture Structure

## 📁 โครงสร้างไฟล์

```
src/
├── domain/                    # 🎯 Domain Layer (แกนกลางของธุรกิจ)
│   ├── entities/             # ข้อมูลและ business rules หลัก
│   │   └── User.ts          # User entity และ interfaces
│   ├── repositories/         # Repository interfaces
│   │   └── IUserRepository.ts
│   └── usecases/            # Business logic และ rules
│       └── UserUseCases.ts
├── application/              # 🔧 Application Layer (business logic)
│   └── services/            # Application services
│       └── UserService.ts   # Validation และ orchestration
├── infrastructure/           # 🏗️ Infrastructure Layer (external concerns)
│   ├── repositories/        # Repository implementations
│   │   └── UserRepository.ts
│   └── di/                 # Dependency injection
│       └── container.ts    # DI Container
└── presentation/            # 🎨 Presentation Layer (UI)
    ├── components/         # React components
    │   ├── UserForm.tsx
    │   └── UserList.tsx
    ├── hooks/             # Custom hooks
    │   └── useUsers.ts
    └── pages/             # Page components
        └── UsersPage.tsx
```

## 🔄 Dependency Flow

```
Presentation Layer
       ↓
Application Layer
       ↓
Domain Layer
       ↑
Infrastructure Layer
```

## 📋 รายละเอียดแต่ละ Layer

### 1. Domain Layer (`src/domain/`)

**หน้าที่**: แกนกลางของธุรกิจ ไม่ขึ้นกับ external frameworks

#### Entities (`src/domain/entities/`)
- **User.ts**: ข้อมูลและ business rules ของ User
- ประกอบด้วย interfaces: `User`, `CreateUserRequest`, `UpdateUserRequest`

#### Repository Interfaces (`src/domain/repositories/`)
- **IUserRepository.ts**: Interface สำหรับการเข้าถึงข้อมูล
- กำหนด contract สำหรับ data access

#### Use Cases (`src/domain/usecases/`)
- **UserUseCases.ts**: Business logic และ rules
- จัดการ business operations เช่น create, update, delete user

### 2. Application Layer (`src/application/`)

**หน้าที่**: จัดการ business logic และ orchestrate ระหว่าง layers

#### Services (`src/application/services/`)
- **UserService.ts**: 
  - Validation logic
  - Error handling
  - Orchestration ระหว่าง Domain และ Infrastructure

### 3. Infrastructure Layer (`src/infrastructure/`)

**หน้าที่**: จัดการ external concerns และ implementations

#### Repositories (`src/infrastructure/repositories/`)
- **UserRepository.ts**: Implementation ของ IUserRepository
- จัดการ data persistence (ปัจจุบันใช้ in-memory storage)

#### Dependency Injection (`src/infrastructure/di/`)
- **container.ts**: DI Container สำหรับจัดการ dependencies
- Singleton pattern สำหรับ dependency management

### 4. Presentation Layer (`src/presentation/`)

**หน้าที่**: UI และ user interaction

#### Components (`src/presentation/components/`)
- **UserForm.tsx**: Form component สำหรับสร้าง/แก้ไข user
- **UserList.tsx**: Component แสดงรายการ users

#### Hooks (`src/presentation/hooks/`)
- **useUsers.ts**: Custom hook สำหรับจัดการ user state
- จัดการ loading, error states และ API calls

#### Pages (`src/presentation/pages/`)
- **UsersPage.tsx**: Page component สำหรับจัดการ users
- รวม components และ hooks เข้าด้วยกัน

## 🎯 หลักการ Clean Architecture

### 1. Dependency Rule
- Dependencies ชี้เข้าด้านในเท่านั้น
- Domain Layer ไม่ขึ้นกับ external frameworks
- Infrastructure Layer ขึ้นกับ Domain Layer

### 2. Separation of Concerns
- แต่ละ layer มีหน้าที่เฉพาะ
- ไม่มีการผสม business logic กับ UI logic

### 3. Testability
- ทดสอบได้ง่ายและครอบคลุม
- Mock dependencies ได้ง่าย

### 4. Maintainability
- บำรุงรักษาและขยายได้ง่าย
- เปลี่ยน implementation ได้โดยไม่กระทบ business logic

## 🔧 การใช้งาน

### การเพิ่มฟีเจอร์ใหม่

1. **สร้าง Entity** ใน `src/domain/entities/`
2. **สร้าง Repository Interface** ใน `src/domain/repositories/`
3. **สร้าง Use Cases** ใน `src/domain/usecases/`
4. **สร้าง Repository Implementation** ใน `src/infrastructure/repositories/`
5. **สร้าง Application Service** ใน `src/application/services/`
6. **สร้าง Presentation Components** ใน `src/presentation/`

### การทดสอบ

- **Unit Tests**: ทดสอบ Use Cases และ Services
- **Integration Tests**: ทดสอบ Repository implementations
- **Component Tests**: ทดสอบ React components
