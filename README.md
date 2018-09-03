# Kubernetes workshop

Workshop about Kubernetes

## Deploy in GCE kubernetes cluster

1. Deploy secrets

```
kubectl apply -f k8s/security/secrets.yaml
```

2. Deploy deployment

````
kubectl apply -f k8s/workload/deployment.yaml
```

3. Deploy service

````
kubectl apply -f k8s/network/service.yaml
```

4. Deploy ingress

````
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


````
kubectl apply -f k8s/workload/hpa.yaml
```

And if you want deploy the volume test, execute the next command:

````
kubectl apply -f k8s/workload/deployment-with-pvc.yaml
```