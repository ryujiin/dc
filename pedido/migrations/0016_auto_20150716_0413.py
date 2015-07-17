# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0015_auto_20150716_0359'),
    ]

    operations = [
        migrations.CreateModel(
            name='ModificacionPedido',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('fecha_modificacion', models.DateTimeField(auto_now=True, db_index=True)),
                ('estado', models.ForeignKey(to='pedido.EstadoPedido')),
                ('pedido', models.ForeignKey(to='pedido.Pedido')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterField(
            model_name='pedido',
            name='carro',
            field=models.ForeignKey(to='cesta.Carro', unique=True),
            preserve_default=True,
        ),
    ]
