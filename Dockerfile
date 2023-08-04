# 使用 Node.js 作为基础镜像
FROM node:18
RUN npm install -g pnpm
# 在容器中创建并设置工作目录
WORKDIR /app
# 将本地的 package.json 和 pnpm-lock.yaml 复制到容器中
COPY package.json pnpm-lock.yaml /app/
# 安装项目的依赖项
RUN pnpm install
# 复制本地项目的所有文件到容器中
COPY . /app
# 暴露应用程序使用的端口号
EXPOSE 3000
# 在容器中运行 pnpm run dev
CMD ["pnpm", "run", "dev"]

