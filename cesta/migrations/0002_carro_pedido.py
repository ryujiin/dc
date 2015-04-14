# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0009_remove_pedido_carro'),
        ('cesta', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='carro',
            name='pedido',
            field=models.ForeignKey(blank=True, to='pedido.Pedido', null=True),
            preserve_default=True,
        ),
    ]
