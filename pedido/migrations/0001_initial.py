# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('cesta', '0001_initial'),
        ('cliente', '0005_direccion_telefono'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EstadoPedido',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('nombre', models.CharField(max_length=100)),
                ('descripcion', models.TextField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Pedido',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('numero', models.BigIntegerField(unique=True, verbose_name=b'Numero de Pedido', db_index=True)),
                ('gasto_envio', models.DecimalField(max_digits=12, decimal_places=2)),
                ('metodo_envio', models.CharField(max_length=100, null=True, blank=True)),
                ('fecha_compra', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('carro', models.ForeignKey(to='cesta.Carro')),
                ('direccion_envio', models.ForeignKey(blank=True, to='cliente.Direccion', null=True)),
                ('estado', models.ForeignKey(to='pedido.EstadoPedido')),
                ('user', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
