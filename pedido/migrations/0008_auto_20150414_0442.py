# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0007_auto_20150414_0027'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='carro',
            field=models.ForeignKey(blank=True, to='cesta.Carro', null=True),
            preserve_default=True,
        ),
    ]
