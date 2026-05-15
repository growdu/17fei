FROM denoland/deno:1.40.0

# 工作目录
WORKDIR /app

# 复制依赖配置
COPY deno.json deno.json

# 安装依赖（缓存）
RUN deno cache --reload --imports-url deno.json dev.ts

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 8000

# 启动命令
CMD ["deno", "run", "--unstable", "-A", "--watch=static/,routes/", "dev.ts"]