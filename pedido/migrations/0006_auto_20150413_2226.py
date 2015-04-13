# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pedido', '0005_auto_20150413_2222'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='numero_pedido',
            field=models.CharField(max_length=120, null=True, blank=True),
            preserve_default=True,
        ),
    ]
