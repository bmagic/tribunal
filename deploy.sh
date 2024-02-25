docker run --rm --privileged docker/binfmt:a7996909642ee92942dcd6cff44b9b95f08dad64
docker buildx build --platform linux/arm64 -t bmagic/tribunal:1.1.6 .
docker push  bmagic/tribunal:1.1.6