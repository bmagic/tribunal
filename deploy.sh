docker run --rm --privileged docker/binfmt:a7996909642ee92942dcd6cff44b9b95f08dad64
docker buildx build --platform linux/arm64 -t bmagic/tribunal:1.1.0 .
docker push  bmagic/tribunal:1.1.0
kubectl rollout restart deployment/tribunal -n bmagic
kubectl rollout status deployment/tribunal -n bmagic