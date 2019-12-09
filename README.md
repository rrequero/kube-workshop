# Kubernetes workshop

Workshop about Kubernetes

Slides: https://docs.google.com/presentation/d/1W6tmSTEp6AvTAJaGhcdAh0waXObJQmQRt7ZRk_XOoAA/edit?usp=sharing

## Deploy in GCE kubernetes cluster

First you need to create a kubernetes cluster in your GCE account. After configure your kubectl commad to work with this cluster. 




1. Deploy secrets

```
kubectl apply -f k8s/security/secrets.yaml
```

2. Deploy deployment

```
kubectl apply -f k8s/workload/deployment.yaml
```

3. Deploy service

```
kubectl apply -f k8s/network/service.yaml
```

4. Deploy ingress

```
kubectl apply -f k8s/network/ingress.yaml
```

5. Wait that Ingress is deployed and GCE assigns a static IP. You can check if the ingress has ip with the next command:

```
kubectl get ingress
```

6. With the IP, you create a new register in /etc/hosts file with the new ip and the 'mydomain.com' domain:

```
<ip>  mydomain.com
```

If you want deploy the hpa, execute the next command:


```
kubectl apply -f k8s/workload/hpa.yaml
```

#### Deployment with Volume

If you want to deploy the application with the volume, you need to remove the previous deployment and deploy the storage and new deployment with the next commands:


```
kubectl delete deploy kube-workshop

kubectl apply -f k8s/storage/persistant-volume.yaml
kubectl apply -f k8s/workload/deployment-with-pvc.yaml
```

## Endpoints

When you've deployed your app, the app exposes the next endpoints:

1. Save key and value

POST /api/v1/sqlite/set 
body:

```
{
    "key": "mykey",
    "value": "myValue"
}
```

2. Get value by key

GET /api/v1/sqlite/get/:key

3. Generate a JWT token with the content of the request and the password configured in the secrets

POST /api/v1/jwt
body:

```
{
    "id": 1,
    "role": "ADMIN"
}
```

4. Generate the hash of the text in the param. 

IMPORTANT!: This endpoint runs a hashSync method to force to the HPA to scale the pod. Don't use in production.

GET /api/v1/hash/:text

5. Health endpoint. Used for the ingress to check the health of the service.

GET /api/v1/health