# 付费群组 member-group

## 依赖

- Node.js 20.11.1 （必须高于 20.6.0，因为这个版本支持直接加载 .env 文件）
- PNPM 8.6.1+

## 开发

```bash
pnpm i
pnpm dev
```

### 设置 bot description

打开 `src/set_description.ts` 进行编辑，然后运行

```bash
pnpm set_description
```

## 部署

1. 在 .env 文件或者在 bashrc 文件中设置环境变量 BOT_TOKEN 和 PROXY_PORT
2. 运行 pnpm start
