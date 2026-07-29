---
title: Break It on Purpose
description: Delete your dashboard, restore a snapshot, and practice cloning the server.
sidebar:
  order: 8
---

You are going to break your server on purpose. Knowing you can undo an experiment is what makes a homelab fun instead of scary.

## Delete the dashboard

1. Open Dockhand and select the `heimdall` stack.
2. Delete the stack, selecting the option to remove its volumes when asked.
3. Open `http://CONTAINER-IP:8080`. The dashboard should be gone.

## Roll it back

1. In Proxmox, select the Debian container and open **Snapshots**.
2. Select `working-dashboard` and choose **Rollback**.
3. Confirm that changes made after the snapshot will be discarded.
4. Wait for rollback to finish. Start the container if Proxmox leaves it stopped.
5. Reload `http://CONTAINER-IP:8080` and watch Heimdall return.

The snapshot restored the container's filesystem and configuration to the moment you captured it. Future experiments can be bold because you now know how to get back.

## Clone your working server

Stop the Debian container, then choose **More → Clone**. Select **Full Clone**, give it a different hostname such as `docker-sandbox`, choose a new CT ID, and create it.

Keep the original stopped while you test the clone. A clone copies system
identity files along with the apps, so running both at once can cause a network
address conflict. Start the clone, confirm that it contains the same apps, then
stop it. Select the clone and choose **More → Remove** to delete it, then
restart the original.

A clone is a safe sandbox for a larger experiment and a starting template for your next server.

You have proved you can break something and get it back.
