docker run --rm --privileged docker/binfmt:820fdd95a9972a5308930a2bdfb8573dd4447ad3
docker buildx build --platform linux/arm64 -t bmagic/tribunal:1.0 .
docker push  bmagic/tribunal:1.0