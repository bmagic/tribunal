docker run --privileged --rm tonistiigi/binfmt --install all
docker --debug buildx build --platform linux/arm64 --tag bmagic/tribunal:1.7.0 --push .
